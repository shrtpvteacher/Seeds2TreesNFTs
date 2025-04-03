const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../public/_redirects');
const dest = path.join(__dirname, '../build/_redirects');

fs.copyFile(source, dest, (err) => {
  if (err) {
    console.error("❌ Failed to copy _redirects:", err);
    process.exit(1);
  } else {
    console.log("✅ _redirects copied to build/");
  }
});
