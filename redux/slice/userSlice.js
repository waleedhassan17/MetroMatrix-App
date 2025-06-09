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

// Login thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ input, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, input, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register thunk
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, phone, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: name });

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        phone,
        email,
        createdAt: new Date(),
      });

      return userCredential.user;
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
