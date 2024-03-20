import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = newPage => {
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
        <TouchableOpacity
          key={pageNumber}
          onPress={() => handlePageChange(pageNumber)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: pageNumber === page ? 'blue' : 'gray',
            borderRadius: 5,
            margin: 5,
          }}>
          <Text style={{ color: 'white' }}>{pageNumber}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Pagination;
