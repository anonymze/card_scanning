export default function DevToolMenu() {
  if (__DEV__) {
    const { DevMenu } = require('./dev-menu');
    return <DevMenu />;
  }

  return null;
}
