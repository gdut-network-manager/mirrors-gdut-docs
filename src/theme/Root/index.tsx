import React from 'react';
import Root from '@theme-original/Root';
import {useMirrorLineEffect} from '@site/src/hooks/useMirrorDomain';
import {useTabsSwitchAnimation} from '@site/src/hooks/useTabsSwitchAnimation';

export default function RootWrapper(props: Parameters<typeof Root>[0]) {
  useMirrorLineEffect();
  useTabsSwitchAnimation();
  return <Root {...props} />;
}
