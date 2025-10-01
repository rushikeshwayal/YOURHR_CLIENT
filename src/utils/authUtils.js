// Utility functions for authentication and user management
import { API_URLS } from '../config/api';

export const handleGoogleUser = async (firebaseUser) => {
    try {
        console.log('🔍 Checking if Google user exists:', firebaseUser.email);

        // Check if user exists in database
        const checkResponse = await fetch(API_URLS.CHECK_USER(firebaseUser.email));

        if (!checkResponse.ok) {
            console.error('❌ Failed to check user existence:', checkResponse.status, checkResponse.statusText);
            return { success: false, error: `Server error: ${checkResponse.status}` };
        }

        const checkResult = await checkResponse.json();
        console.log('📋 User check result:', checkResult);

        if (!checkResult.exists) {
            // User doesn't exist, create new user
            console.log('👤 Creating new Google user...');
            const userData = {
                full_name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                email_address: firebaseUser.email,
                phone_number: firebaseUser.phoneNumber || null,
                photo_url: firebaseUser.photoURL || null
            };

            console.log('📤 Sending user data:', userData);

            const createResponse = await fetch(API_URLS.GOOGLE_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (createResponse.ok) {
                const newUser = await createResponse.json();
                console.log('✅ New Google user created:', newUser);
                return { success: true, user: newUser, isNew: true };
            } else {
                const errorText = await createResponse.text();
                console.error('❌ Failed to create Google user:', createResponse.status, errorText);
                return { success: false, error: `Server error: ${createResponse.status} - ${errorText}` };
            }
        } else {
            console.log('✅ Google user already exists:', checkResult.user);
            return { success: true, user: checkResult.user, isNew: false };
        }
    } catch (error) {
        console.error('❌ Error handling Google user:', error);
        return { success: false, error: `Network error: ${error.message}` };
    }
};

export const createRegularUser = async (firebaseUser, password) => {
    try {
        const userData = {
            full_name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            email_address: firebaseUser.email,
            phone_number: firebaseUser.phoneNumber || null,
            password: password
        };

        const response = await fetch(API_URLS.USERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const newUser = await response.json();
            console.log('Regular user created:', newUser);
            return { success: true, user: newUser };
        } else {
            const error = await response.json();
            console.error('Failed to create regular user:', error);
            return { success: false, error: error.detail || 'Failed to create user' };
        }
    } catch (error) {
        console.error('Error creating regular user:', error);
        return { success: false, error: error.message };
    }
};

export const getUserFromDatabase = async (email) => {
    try {
        const response = await fetch(API_URLS.CHECK_USER(email));
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching user from database:', error);
        return { exists: false, user: null };
    }
};
