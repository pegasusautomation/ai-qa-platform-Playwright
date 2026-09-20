pipeline {
    agent any

    environment {
        IMAGE_NAME   = "ai-qa-platform:${BUILD_NUMBER}"
        NETWORK_NAME = "ai-qa-network-${BUILD_NUMBER}"
        APP_NAME     = "ai-qa-app-${BUILD_NUMBER}"
        TEST_NAME    = "ai-qa-tests-${BUILD_NUMBER}"
        BASE_URL     = "http://ai-qa-app-${BUILD_NUMBER}:3000"
        LLM_PROVIDER = "demo"
        CI           = "true"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${IMAGE_NAME} .
                """
            }
        }

        stage('Create Network') {
            steps {
                sh """
                    docker network create ${NETWORK_NAME}
                """
            }
        }

        stage('Start Application') {
            steps {
                sh """
                    docker run -d \
                      --name ${APP_NAME} \
                      --network ${NETWORK_NAME} \
                      -e LLM_PROVIDER=${LLM_PROVIDER} \
                      ${IMAGE_NAME}
                """
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Waiting for application..."

                    for i in $(seq 1 30); do
                        echo "Health check attempt $i"

                        if docker run --rm \
                            --network ${NETWORK_NAME} \
                            ${IMAGE_NAME} \
                            node -e "fetch('${BASE_URL}/health').then(r => { console.log('HTTP:', r.status); process.exit(r.ok ? 0 : 1); }).catch(e => { console.error('FETCH ERROR:', e.message); process.exit(1); })"
                        then
                            echo "Application is healthy"
                            exit 0
                        fi

                        sleep 1
                    done

                    echo "Application container logs:"
                    docker logs ${APP_NAME} || true

                    echo "Application container status:"
                    docker inspect ${APP_NAME} \
                      --format '{{.State.Status}} exit={{.State.ExitCode}}' || true

                    exit 1
                '''
            }
        }

        stage('Playwright Tests') {
            steps {
                script {

                    // Make sure Jenkins workspace directories exist
                    sh '''
                        mkdir -p playwright-report
                        mkdir -p test-results
                    '''

                    def testExit = sh(
                        script: """
                            docker run \
                              --name ${TEST_NAME} \
                              --network ${NETWORK_NAME} \
                              -e BASE_URL=${BASE_URL} \
                              -e LLM_PROVIDER=${LLM_PROVIDER} \
                              -e CI=true \
                              ${IMAGE_NAME} \
                              npm test
                        """,
                        returnStatus: true
                    )

                    echo "Playwright exit code: ${testExit}"

                    echo "Copying Playwright HTML report..."
                    sh """
                        docker cp ${TEST_NAME}:/app/playwright-report/. playwright-report/ || true
                    """

                    echo "Copying JUnit test results..."
                    sh """
                        docker cp ${TEST_NAME}:/app/test-results/. test-results/ || true
                    """

                    echo "Removing Playwright test container..."
                    sh """
                        docker rm -f ${TEST_NAME} || true
                    """

                    if (testExit != 0) {
                        error("Playwright tests failed")
                    }
                }
            }

            post {
                always {
                    junit(
                        testResults: 'test-results/results.xml',
                        allowEmptyResults: true
                    )

                    archiveArtifacts(
                        artifacts: 'playwright-report/**',
                        allowEmptyArchive: true
                    )

                    archiveArtifacts(
                        artifacts: 'test-results/**',
                        allowEmptyArchive: true
                    )
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning application container..."

            sh """
                docker rm -f ${APP_NAME} || true
            """

            echo "Cleaning Docker network..."

            sh """
                docker network rm ${NETWORK_NAME} || true
            """
        }

        success {
            echo 'AI QA Pipeline PASSED'
        }

        failure {
            echo 'AI QA Pipeline FAILED'
        }

        cleanup {
            echo "Cleaning Docker image..."

            sh """
                docker rmi ${IMAGE_NAME} || true
            """
        }
    }
}