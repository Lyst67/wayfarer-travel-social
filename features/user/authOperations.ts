import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from '@react-native-firebase/auth';
export const auth = getAuth();

export const registerWithProfile = async (email: string, password: string, userName: string | undefined, userImage: string | null) => {  
    try {  
      const response = await createUserWithEmailAndPassword(auth, email, password);  
      const user = response.user;  
      await updateProfile(user, {  
        displayName: userName,  
        photoURL: userImage,  
      });  
      return {  
        success: true,  
        data: {  
          userDataEmail: user.email,
          userDataName: user.displayName,  
          userDataImage: user.photoURL,  
          userId: user.uid,  
        },  
      };  
    } catch (error: any) {  
      return {  
        success: false,  
        message: error.message,  
      };  
    }  
  };  

export const loginWithEmailAndPassword = async (email: string, password: string) => {  
    try {  
      const response = await signInWithEmailAndPassword(auth, email, password);  
      return {  
        success: true,  
        data: {  
          userName: response.user.displayName,  
          userImage: response.user.photoURL,  
          userId: response.user.uid,  
        },  
      };  
    } catch (error: any) {  
      return {  
        success: false,  
        message: error.message,  
      };  
    }  
  };

  export const logout = async () => {  
    try {  
      await signOut(auth);  
      return {  
        success: true,  
        message: "User signed out successfully!",  
      };  
    } catch (error: any) {  
      return {  
        success: false,  
        message: error.message,  
      };  
    }  
  }; 