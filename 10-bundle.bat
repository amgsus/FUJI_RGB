@echo off

del build\app.bundle.js

cd src

kaluma bundle ./index.js --output ../build/app.bundle.js --minify

pause
