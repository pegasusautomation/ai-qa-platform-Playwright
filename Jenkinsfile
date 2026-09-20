pipeline {
    agent any

    environment {
        IMAGE_NAME = "ai-qa-platform:${BUILD_NUMBER}"
        NETWORK_NAME = "ai-qa-network-${BUILD_NUMBER}"
        APP_NAME = "ai-qa-app-${BUILD_NUMBER}"
        BASE_URL = "http://ai-qa-app-${BUILD_NUMBER}:3000"
        LLM_PROVIDER = "demo"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Create Network') {
            steps {
                sh "docker network create ${NETWORK_NAME}"
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
                sh """
                    docker run --rm \
                      --network ${NETWORK_NAME} \
                      -e BASE_URL=${BASE_URL} \
                      -e LLM_PROVIDER=${LLM_PROVIDER} \
                      -v "\$WORKSPACE/playwright-report:/app/playwright-report" \
                      -v "\$WORKSPACE/test-results:/app/test-results" \
                      ${IMAGE_NAME} \
                      npm test
                """
            }
        }
    }

    post {
        always {
            sh "docker rm -f ${APP_NAME} || true"
            sh "docker network rm ${NETWORK_NAME} || true"

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                allowEmptyArchive: true
            )

            archiveArtifacts(
                artifacts: 'test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'AI QA Pipeline PASSED'
        }

        failure {
            echo 'AI QA Pipeline FAILED'
        }

        cleanup {
            sh "docker rmi ${IMAGE_NAME} || true"
        }
    }
}