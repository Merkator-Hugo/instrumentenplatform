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

# Run image on docker-playground (verbose)
1: ga naar https://www.docker.com/play-with-docker
2: Kies 'Lab Environment' (en log in indien nodig)
3: Klik op '+ Add a new Instance'
4: type op de command-prompt: 'docker run -dp 84:80 hugozalm/instrumentenplatform:4'
Je opent de site dan in je browser door op het getal 84 (in een blauw cirkeltje achter 'open port') te klikken

Om de oudere versies te zien, open je een 2e, 3e of 4e instantie en gebruik je volgende commando's:
'docker run -dp 81:80 hugozalm/instrumentenplatform:1'
'docker run -dp 82:80 hugozalm/instrumentenplatform:2'
'docker run -dp 83:80 hugozalm/instrumentenplatform:3'
Open respectievelijk met 81, 82 en 83

Om de real-time data te zien, moet je eerst de VPN naar Halley openzetten.
Maar dan krijg je nog maar 2 waarden (binnentemperatuur en luchtdruk).
Om een volledige gevoel te krijgen, zet je de knop demo aan. Met de klok die verschijnt kan je het proces (de tijd dus) versnellen (zodat je ook wat ziet gebeuren)