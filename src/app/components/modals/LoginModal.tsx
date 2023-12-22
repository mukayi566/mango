'use client';

import { signIn } from 'next-auth/react';
import {FcGoogle  } from 'react-icons/fc';
import { useCallback, useState} from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';


const LoginModal = () => {
    const registerModal = useRegisterModal();
    const router = useRouter();
    const loginModal = useLoginModal();
    const[isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email:'',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setIsLoading(true);
        
        signIn('credentials', {
            ...data,
            redirect: false
        })

        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok){
                toast.success('You are logged in');
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error){
                toast.error(callback.error);
            }
        })
    
    }

    const bodyContent =(
        <div className="flex flex-col gap-4">
            <Heading 
               title='Welcome to back'
               subtitle='Login to your account!'
               center
            />
            <Input 
              id="email"
              label='Email'
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
             <Input 
              id="password"
              type='password'
              label='Password'
              disabled={isLoading} 
              register={register}
              errors={errors}
              required
            />
        </div>
    );

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const footerContent = (
        <div className='flexl flex-col gap-4 mt-3'>
            <hr/>
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <div 
                className='
                 text-neutral-500 
                   text-center 
                   mt-4 
                  font-light'
                   >
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        First time using Mango?    
                    </div>
                    <div 
                       onClick={toggle}
                       className='text-neutral-800 
                       cursor-pointer 
                        hover:underline'
                        >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
        disabled= {isLoading} 
        isOpen={loginModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    )
}

export default LoginModal;
