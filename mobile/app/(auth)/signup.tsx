import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import useAuth from '@/hooks/useAuth';
import { validateEmail, validateName, validatePassword } from '@/lib/utils';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const Signup = () => {
    const toast = useToast();
    const { register, registering } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

const handleSubmit = () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
        return toast.show("Please fill in all fields", { type: 'danger' });
    }

    const nameCheck = validateName(name);
    const emailCheck = validateEmail(email);
    const passCheck = validatePassword(password);

    if (!nameCheck.valid) {
        return toast.show(nameCheck.message, { type: 'danger' });
    }
    if (!emailCheck.valid) {
        return toast.show(emailCheck.message, { type: 'danger' });
    }
    if (!passCheck.valid) {
        return toast.show(passCheck.message, { type: 'danger' });
    }

    register(name, email, password);
};

    return (
        <SafeAreaView>
            <View className='h-full justify-center px-6'>
                <Text className='text-2xl font-semibold'>Create account</Text>
                <View className='w-full mt-10'>
                    <CustomInput
                        label='Full Name'
                        value={formData.name}
                        onChangeText={(val) => setFormData({ ...formData, name: val })}
                    />
                    <CustomInput
                        label='Email'
                        value={formData.email}
                        onChangeText={(val) => setFormData({ ...formData, email: val })}
                        containerStyles='mt-3'
                    />
                    <CustomInput
                        label='Password'
                        secureTextEntry
                        value={formData.password} // ✅ Add missing value binding
                        onChangeText={(val) => setFormData({ ...formData, password: val })}
                        containerStyles='mt-3'
                    />
                </View>
                <CustomButton
                    title='Signup'
                    handlePress={handleSubmit}
                    containerStyles='mt-8'
                    isLoading={registering}
                />
                <View className='flex flex-row gap-1 mt-3'>
                    <Text className='text-base'>Already have an account?</Text>
                    <Link href={'/login'}>
                        <Text className='text-cyan-600 text-base'>Login</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Signup;
