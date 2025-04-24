import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { generateResponse } from '../constants/geminiConfig';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const RESPONSE_TIMEOUT = 15000; // Reduced to 15 seconds

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef();
    const timeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleSend = async () => {
        if (inputText.trim() === '' || isLoading) return;

        const userMessage = inputText;
        setInputText('');
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setIsLoading(true);

        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();

        // Set timeout for the response
        timeoutRef.current = setTimeout(() => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            setIsLoading(false);
            setMessages(prev => [...prev, {
                text: 'The response is taking too long. Please try again with a shorter message.',
                isUser: false
            }]);
        }, RESPONSE_TIMEOUT);

        try {
            const response = await generateResponse(userMessage);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setMessages(prev => [...prev, { text: response, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
            if (error.name === 'AbortError') {
                setMessages(prev => [...prev, {
                    text: 'Request was cancelled due to timeout. Please try again.',
                    isUser: false
                }]);
            } else {
                setMessages(prev => [...prev, {
                    text: 'Sorry, something went wrong. Please try again.',
                    isUser: false
                }]);
            }
        } finally {
            setIsLoading(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            abortControllerRef.current = null;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((message, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageBubble,
                            message.isUser ? styles.userMessage : styles.botMessage,
                        ]}
                    >
                        <Text style={[
                            styles.messageText,
                            message.isUser ? styles.userMessageText : styles.botMessageText
                        ]}>
                            {message.text}
                        </Text>
                    </View>
                ))}
                {isLoading && (
                    <View style={[styles.messageBubble, styles.botMessage]}>
                        <View style={styles.thinkingContainer}>
                            <ActivityIndicator size="small" color={theme.colors.primary} />
                            <Text style={styles.thinkingText}>Thinking...</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type your message..."
                    placeholderTextColor={theme.colors.text.secondary}
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        (inputText.trim() === '' || isLoading) && styles.sendButtonDisabled
                    ]}
                    onPress={handleSend}
                    disabled={inputText.trim() === '' || isLoading}
                >
                    <Ionicons
                        name="send"
                        size={24}
                        color={theme.colors.text.light}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: theme.spacing.lg,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.md,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.primary,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.surface,
    },
    messageText: {
        ...theme.typography.body,
    },
    userMessageText: {
        color: theme.colors.text.light,
    },
    botMessageText: {
        color: theme.colors.text.primary,
    },
    thinkingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    thinkingText: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        marginLeft: theme.spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginRight: theme.spacing.md,
        ...theme.typography.body,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.round,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
});

export default Chat; 