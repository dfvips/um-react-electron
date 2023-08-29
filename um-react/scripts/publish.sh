#!/bin/bash -e

BRANCH_NAME="$(git branch --show-current)"

publish_gitea() {
    local ZIP_NAME="$1"
    local URL="${DRONE_GITEA_SERVER}/api/packages/${DRONE_REPO_NAMESPACE}/generic/${DRONE_REPO_NAME}/${DRONE_BUILD_NUMBER}/${ZIP_NAME}"
    sha256sum "${ZIP_NAME}"
    curl -sLifu "um-release-bot:${GITEA_API_KEY}" -T "${ZIP_NAME}" "${URL}"
    echo "Uploaded to: ${URL}"
}

# Only publish main branch by default
if [[ "${BRANCH_NAME}" = "main" && -z "$DRONE_PULL_REQUEST" ]]; then
    echo 'prepare to publish...'

    if [[ -n "${GITEA_API_KEY}" ]]; then
        echo "Publish to gitea..."
        publish_gitea "um-react.zip"
    fi
fi
