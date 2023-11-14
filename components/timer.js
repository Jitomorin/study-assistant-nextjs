'use client';

import { useEffect } from 'react';
import { Pause, PlayArrow, RestartAlt } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import { useTimerStore } from '../store/timerStore';
import { formatTime } from '../utils/formatTime';

// import { Button } from './Button';
import { Settings } from '../components/Settings';

export const Timer = () => {
  const { isRunning, mode, timeLeft, changeMode, countDown, resetTimer, toggleTimer } =
    useTimerStore();

  useEffect(() => {
    let tick=null

    if (isRunning) {
      tick = setInterval(() => {
        countDown();
      }, 1000);
    }

    if (timeLeft === 0) {
      const audio = new Audio('/beep.mp3');
      void audio.play();
    } else if (timeLeft < 0) {
      changeMode(mode === 'break' ? 'work' : 'break');
    }

    return () => {
      if (tick) {
        clearInterval(tick);
      }
    };
  }, [changeMode, countDown, isRunning, mode, timeLeft]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          height: 180,
          width: 180,
          mx: 'auto',
          my: 5,
          position: 'relative',
        }}
      >
        <Typography
          component='h2'
          variant='h6'
          sx={{
            position: 'absolute',
            top: '10%',
            opacity: 0.8,
            textTransform: 'capitalize',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {mode}
        </Typography>
        <Typography sx={{
          fontSize: '8rem',
        }} component='h1' variant='h3'>
          {formatTime(timeLeft)}
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          position='absolute'
          bottom={-10}
        >
          {/* <Button
            icon={isRunning ? <Pause /> : <PlayArrow />}
            label={isRunning ? 'Pause the timer' : 'Start the timer'}
            onClick={() => toggleTimer()}
          /> */}
          <Button sx={{color:"#4A4E69"}} variant="text" onClick={() => toggleTimer()}>{isRunning ? <Pause /> : <PlayArrow />}</Button>
          <Button sx={{color:"#4A4E69"}} variant="text" onClick={() => resetTimer()}><RestartAlt /></Button>
          {/* <Button icon={<RestartAlt />} label='Reset the timer' onClick={() => resetTimer()} /> */}
        </Stack>
      </Box>
      
      <Settings />
      
    </>
  );
};
