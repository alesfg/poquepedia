import React from 'react';
// import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';
import { View, Text } from 'react-native';

/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */
const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <View>
        {/* <LoadingSpinner data-testid="spinner" size="large" theme="grayscale" /> */}
        <Text>Esta chargin</Text>
      </View>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default QueryResult;
