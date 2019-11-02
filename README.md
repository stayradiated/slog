# Slog

> Track how long an async task is taking

## Installation

```
npm install @stayradiated/slog
```

## Usage

```javascript
import slog from '@stayradiated/slog'
import execa from 'execa'

await slog(
  'Installing dependencies',
  execa('npm', ['install'])
)

/*
Installing dependencies (0:00)
Installing dependencies (0:01)
Installing dependencies (0:02)
Installing dependencies (0:03) ✓
*/
```
