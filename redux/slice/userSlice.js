import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { isOffline } from '../../utils/checkNetwork';
import { useEffect } from 'react';


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ input, password }, { rejectWithValue }) => {
    try {
      if (await isOffline()) {
        Alert.alert('You are offline', 'Please check your internet connection.');
        return rejectWithValue('Offline');
      }

      const userCredential = await signInWithEmailAndPassword(auth, input, password);
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        Alert.alert('You are offline', 'Please check your internet connection.');
      }
      return rejectWithValue(error.message);
    }
  }
);


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, phone, email, password }, { rejectWithValue }) => {
    try {
      if (await isOffline()) {
        Alert.alert('You are offline', 'Please check your internet connection.');
        return rejectWithValue('You are offline. Please check your internet connection');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        name,
        phone,
        email,
        createdAt: new Date(),
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: name,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Reset password thunk
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
       if (await isOffline()) {
        Alert.alert('You are offline', 'Please check your internet connection.');
        await new Promise(res => setTimeout(res, 500));
        return rejectWithValue('Offline');
      }

      await sendPasswordResetEmail(auth, email);
      return 'Password reset email sent!';
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Updated Change password thunk (Only keep this version)
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {


       if (await isOffline()) {
        Alert.alert('You are offline', 'Please check your internet connection.');
        return rejectWithValue('Offline');
      }

      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('User not authenticated or email missing. Please login again.');
      }

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      return 'Password changed successfully!';
    } catch (error) {
      console.log('Password Change Error:', error.message);
      return rejectWithValue(error.message || 'Failed to change password.');
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {

   if (await isOffline()) {
        Alert.alert('You are offline', 'Please check your internet connection.');
        return rejectWithValue('Offline');
      }

  await signOut(auth);
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    error: null,
    loading: false,
    passwordResetMessage: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
      state.passwordResetMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordResetMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordResetMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordResetMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordResetMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
