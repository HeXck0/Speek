const speekLogo = `

  _________                        .___      __________               __    
 /   _____/_____   ____   ____   __| _/__.__.\\______   \\ ____   ____ |  | __
 \\_____  \\\\____ \\_/ __ \\_/ __ \\ / __ <   |  | |     ___// __ \\_/ __ \\|  |/ /
 /        \\  |_> >  ___/\\  ___// /_/ |\\___  | |    |   \\  ___/\\  ___/|    < 
/_______  /   __/ \\___  >\\___  >____ |/ ____| |____|    \\___  >\\___  >__|_ \\
        \\/|__|        \\/     \\/     \\/\\/                    \\/     \\/     \\/


`

const getTerminalWidth = () =>  {
  return process.stdout.columns || 80; // fallback
}

const showLogo = () => {
  const width = getTerminalWidth();
  const logoLines = speekLogo.trim().split('\n');

  const paddedLogo = logoLines
    .map(line => line.padStart(Math.floor((width + line.length) / 2)))
    .join('\n');

  return console.log(paddedLogo + '\n');

}

export default showLogo;
