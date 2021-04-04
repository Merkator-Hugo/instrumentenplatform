# First build the docker image
docker build -t halley .

# Then run ...
docker run --rm -it -p 8083:80 halley

# ... and open it
http://localhost:8083


# Find image-id
docker image ls
# Tag and push to docker hub
docker build -f dockerfile-prod -t instrumentenplatform:<tag> .
docker tag <image-id> hugozalm/instrumentenplatform:<tag>
docker push hugozalm/instrumentenplatform:<tag>

# Run image localy or on Docker-Playground
https://www.docker.com/play-with-docker (Lab Environment)
docker run -dp 80:80 hugozalm/instrumentenplatform:<tag> 