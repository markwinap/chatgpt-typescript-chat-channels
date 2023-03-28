# sam-chatgpt

## Deploy AWS Resources
```sh
sam sync -u --parameter-overrides OpenAIKey=sk-xxxxxxxxxxxxx --profile your-profile
```

## Linux Docker Fix
```sh
docker context ls
export DOCKER_HOST=unix:///home/{yourusername}/.docker/desktop/docker.sock
```