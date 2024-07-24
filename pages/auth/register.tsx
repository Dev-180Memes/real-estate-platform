import React, { useState } from 'react';
import { 
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      toast.success(data.message);
      router.push('/list');
    } else {
      toast.error(data.error);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
        onSubmit={handleSubmit}
      >
        <Heading>Register</Heading>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormControl>
        <p>Already have an account? <Link href="/auth/login">Login</Link></p>
        <Button type="submit" colorScheme={'blue'}>Register</Button>
      </form>
    </div>
  )
}

export default Register
