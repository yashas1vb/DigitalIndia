import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentGuide from './DocumentGuide';
import Checklist from './Checklist';
import NearbyCenters from './NearbyCenters';

const DocumentGuideFeature = ({
  initialDocumentType = 'aadhar',
  documentData,
  documentTypes,
  onDocumentTypeChange,
  customStyles = {}
}) => {
  const [documentType, setDocumentType] = useState(initialDocumentType);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRadius, setSearchRadius] = useState(100);

  const handleDocumentTypeChange = (type) => {
    setDocumentType(type);
    if (onDocumentTypeChange) {
      onDocumentTypeChange(type);
    }
  };

  return (
    <View style={[styles.container, customStyles.container]}>
      <DocumentGuide
        document={documentData[documentType]}
        onSelectDocument={handleDocumentTypeChange}
        documentTypes={documentTypes}
        customStyles={customStyles.documentGuide}
      />

      <Checklist
        items={documentData[documentType].checklist}
        documentType={documentType}
        customStyles={customStyles.checklist}
      />

      <NearbyCenters
        documentType={documentType}
        searchQuery={searchQuery}
        searchRadius={searchRadius}
        customStyles={customStyles.nearbyCenters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default DocumentGuideFeature; 