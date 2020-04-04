function timer({ waitFor, onTick, intervalLength = 100 }) {
  let waited = 0;

  return new Promise((resolve) => {
    const windowInterval = window.setInterval(() => {
      waited += intervalLength;
      onTick({ waited, remaining: waitFor - waited });

      if (waited >= waitFor) {
        resolve();
        window.clearInterval(windowInterval);
      }
    }, intervalLength);
  });
}

export default timer;
