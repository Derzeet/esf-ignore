echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server"
scp -r build/* derzeet@78.40.109.172:/var/www/amlacademy.kz/

echo "Done!"