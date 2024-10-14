import * as React from 'react';
import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import {useEffect} from 'react';
import {
  AudioSession,
  LiveKitRoom,
  useTracks,
  TrackReferenceOrPlaceholder,
  VideoTrack,
  isTrackReference,
  registerGlobals,
} from '@livekit/react-native';
import {Track, LogLevel, setLogLevel} from 'livekit-client';

setLogLevel(LogLevel.debug);
registerGlobals();

const wsURL = 'wss://namnm-42qw5lpa.livekit.cloud';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjg5Mzg5NTcsImlzcyI6IkFQSWd5MnB2SEFlTE14dSIsIm5iZiI6MTcyODkwMjk1Nywic3ViIjoibmFtIiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwicm9vbSI6Im5hbSIsInJvb21Kb2luIjp0cnVlfX0.38JJjY2MHVaapoY3MYsS0LrXmiO5esWvwBMPr_Za2wE';

export default function App() {
  // Start the audio session first.
  useEffect(() => {
    const start = async () => {
      await AudioSession.startAudioSession();
    };
    start();
    return () => {
      AudioSession.stopAudioSession();
    };
  }, []);

  return (
    <LiveKitRoom
      serverUrl={wsURL}
      token={token}
      connect={true}
      options={{
        // Use screen pixel density to handle screens with differing densities.
        adaptiveStream: {pixelDensity: 'screen'},
      }}
      audio={true}
      video={true}>
      <RoomView />
    </LiveKitRoom>
  );
}

const RoomView = () => {
  // Get all camera tracks.
  // The useTracks hook grabs the tracks from LiveKitRoom component
  // providing the context for the Room object.
  const tracks = useTracks([Track.Source.Camera]);

  const renderTrack: ListRenderItem<TrackReferenceOrPlaceholder> = ({item}) => {
    // Render using the VideoTrack component.
    if (isTrackReference(item)) {
      return <VideoTrack trackRef={item} style={styles.participantView} />;
    } else {
      return <View style={styles.participantView} />;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList data={tracks} renderItem={renderTrack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  participantView: {
    height: 300,
  },
});

// "@livekit/react-native": "2.4.2",
// "@livekit/react-native-webrtc": "114.1.6",
// "livekit-client": "2.5.8",

// import React, {useEffect, useState} from 'react';
// import {
//   Button,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   StatusBar,
// } from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { mediaDevices, RTCView } from 'react-native-webrtc';

// const App = () => {
//   const [stream, setStream] = useState(null);
//   const start = async () => {
//     console.log('start');
//     if (!stream) {
//       try {
//         const s = await mediaDevices.getUserMedia({ audio: true, video: true });
//         setStream(s);
//         console.log(s.getVideoTracks()[0].getSettings());
//         console.log(s.getVideoTracks()[0].getConstraints());
//         console.log(s.getVideoTracks()[0].getCapabilities());
//       } catch(e) {
//         console.error(e);
//       }
//     }
//   };
//   const stop = () => {
//     console.log('stop');
//     if (stream) {
//       stream.release();
//       setStream(null);
//     }
//   };
//   useEffect(() => {
//     start();
//   }, []);
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={styles.body}>
//       {
//         stream &&
//           <RTCView
//             streamURL={stream.toURL()}
//             style={styles.stream} />
//       }
//         <View
//           style={styles.footer}>
//           <Button
//             title = "Start"
//             onPress = {start} />
//           <Button
//             title = "Stop"
//             onPress = {stop} />
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: Colors.white,
//     ...StyleSheet.absoluteFill
//   },
//   stream: {
//     flex: 1
//   },
//   footer: {
//     backgroundColor: Colors.lighter,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0
//   },
// });

// export default App;

// // "react-native-webrtc": "124.0.4"
