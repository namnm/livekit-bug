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
import {Track} from 'livekit-client';

registerGlobals();

const wsURL = 'wss://namnm-42qw5lpa.livekit.cloud';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjg2Nzc3OTIsImlzcyI6IkFQSWd5MnB2SEFlTE14dSIsIm5iZiI6MTcyODY3NDE5Miwic3ViIjoibmFtIiwidmlkZW8iOnsiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwicm9vbSI6Im5hbSIsInJvb21Kb2luIjp0cnVlfX0.2Ifn5xHvn7nY9tfUP7_xQFzBthYGaVv8VySnOJKsX8s';

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
