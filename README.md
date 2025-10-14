# FF Apps Archive
https://ffapps.danielherr.software

The actual apps are available from the Internet Archive. Torrent is available. After downloading app collection, run apps_cleanup.mjs to convert the apps collection into a structure suitable for hosting. You only need to run that once after downloading. Then move the apps to ./public/app/

https://archive.org/details/Firefox_Marketplace_2018_03_Capture

magnet:?xt=urn:btih:d3a4a134c4014cff23830e65973ffd80642d4952&dn=Firefox_Marketplace_2018_03_Capture&xl=29368516608&tr=http%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=http%3A%2F%2Fbt2.archive.org%3A6969%2Fannounce&ws=http://ia601502.us.archive.org/4/items/&ws=http://ia801502.us.archive.org/4/items/&ws=https://archive.org/download/

See deploys.txt for build commands. You'll need a system with a good amount of RAM, adjust the build command according to how much you want to use. I used 20GB, when I tried before increasing the RAM limit of Node the build would crash.