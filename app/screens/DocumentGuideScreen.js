import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DocumentGuideFeature from '../components/DocumentGuideFeature';
import { LanguageContext } from '../LanguageContext';

const DocumentGuideScreen = () => {
    const [selectedDocument, setSelectedDocument] = useState('aadhar');

    const documentTypes = ['aadhar', 'pan', 'voter', 'passport'];

    const documentData = {
        aadhar: {
            title: 'Aadhar Card',
            process: [
                'Visit the nearest Aadhar Enrollment Center',
                'Fill out the enrollment form',
                'Provide biometric data (fingerprints and iris scan)',
                'Submit required documents',
                'Receive acknowledgment slip with enrollment ID',
                'Track status online using enrollment ID',
                'Receive Aadhar card by post'
            ],
            checklist: [
                'Proof of Identity (POI)',
                'Proof of Address (POA)',
                'Date of Birth proof',
                'Mobile number',
                'Email ID'
            ]
        },
        pan: {
            title: 'PAN Card',
            process: [
                'Fill out Form 49A online',
                'Upload required documents',
                'Pay application fee',
                'Schedule appointment for verification',
                'Visit PAN center for verification',
                'Track application status',
                'Receive PAN card by post'
            ],
            checklist: [
                'Identity proof',
                'Address proof',
                'Date of birth proof',
                'Passport size photograph',
                'Payment receipt'
            ]
        },
        voter: {
            title: 'Voter ID',
            process: [
                'Fill out Form 6 online',
                'Upload required documents',
                'Visit electoral office for verification',
                'Provide biometric data',
                'Receive acknowledgment slip',
                'Track application status',
                'Collect Voter ID card'
            ],
            checklist: [
                'Proof of age',
                'Proof of residence',
                'Passport size photograph',
                'Aadhar card',
                'Mobile number'
            ]
        },
        passport: {
            title: 'Passport',
            process: [
                'Fill out online application form',
                'Upload required documents',
                'Pay application fee',
                'Schedule appointment at PSK',
                'Visit PSK for verification',
                'Track application status',
                'Receive passport by post'
            ],
            checklist: [
                'Proof of date of birth',
                'Proof of address',
                'Proof of identity',
                'Passport size photographs',
                'Payment receipt'
            ]
        }
    };

    return (
        <ScrollView style={styles.container}>
            <DocumentGuideFeature
                initialDocumentType={selectedDocument}
                documentData={documentData}
                documentTypes={documentTypes}
                onDocumentTypeChange={setSelectedDocument}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default DocumentGuideScreen; 