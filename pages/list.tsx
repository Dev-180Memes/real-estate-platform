import React, { useState } from 'react';
import withAuth from '@/components/hoc/withAuth';
import { UploadDropzone } from '@/utils/uploadthing';
import { 
  Heading,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Textarea,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/router';

const List = () => {
  const [propertyTitle, setPropertyTitle] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [localGovernment, setLocalGovernment] = useState<string>('');
  const [listType, setListType] = useState<'rent' | 'sale'>('rent');
  const [price, setPrice] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [agentName, setAgentName] = useState<string>('');
  const [agentEmail, setAgentEmail] = useState<string>('');
  const [agentPhone, setAgentPhone] = useState<string>('');
  const [images, setImages] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async () => {
    const response = await fetch('/api/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyTitle,
        streetAddress,
        localGovernment,
        listType,
        price,
        bedrooms,
        bathrooms,
        description,
        agentName,
        agentEmail,
        agentPhone,
        images,
      }),
    });

    if (response.ok) {
      toast.success('Property listed successfully');
      setPropertyTitle('');
      setStreetAddress('');
      setLocalGovernment('');
      setListType('rent');
      setPrice(0);
      setBedrooms(0);
      setBathrooms(0);
      setDescription('');
      setAgentName('');
      setAgentEmail('');
      setAgentPhone('');
      setImages('');
      router.push('/search');
    } else {
      toast.error('An error occurred while listing the property');
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <Box
        width="100%"
        maxWidth="500px"
        padding="1rem"
        boxShadow="md"
        borderRadius="md"
      >
        <Heading size="md" marginBottom="1rem">List a Property</Heading>
        <FormControl marginBottom="1rem">
          <FormLabel>Property Title</FormLabel>
          <Input
            type="text"
            placeholder="Property Title"
            value={propertyTitle}
            onChange={(e) => setPropertyTitle(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Street Address</FormLabel>
          <Input
            type="text"
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Local Government</FormLabel>
          <Select
            value={localGovernment}
            onChange={(e) => setLocalGovernment(e.target.value)}
          >
            <option value="Agege">Agege</option>
            <option value="Ajeromi-Ifelodun">Ajeromi-Ifelodun</option>
            <option value="Alimosho">Alimosho</option>
            <option value="Amuwo-Odofin">Amuwo-Odofin</option>
            <option value="Apapa">Apapa</option>
            <option value="Badagry">Badagry</option>
            <option value="Epe">Epe</option>
            <option value="Eti-Osa">Eti-Osa</option>
            <option value="Ibeju-Lekki">Ibeju-Lekki</option>
            <option value="Ifako-Ijaiye">Ifako-Ijaiye</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Ikorodu">Ikorodu</option>
            <option value="Kosofe">Kosofe</option>
            <option value="Lagos Island">Lagos Island</option>
            <option value="Lagos Mainland">Lagos Mainland</option>
            <option value="Mushin">Mushin</option>
            <option value="Ojo">Ojo</option>
            <option value="Oshodi-Isolo">Oshodi-Isolo</option>
            <option value="Shomolu">Shomolu</option>
            <option value="Surulere">Surulere</option>
          </Select>
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>List Type</FormLabel>
          <Select
            value={listType}
            onChange={(e) => setListType(e.target.value as 'rent' | 'sale')}
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </Select>
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Bedrooms</FormLabel>
          <Input
            type="number"
            placeholder="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Bathrooms</FormLabel>
          <Input
            type="number"
            placeholder="Bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Agent Name</FormLabel>
          <Input
            type="text"
            placeholder="Agent Name"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Agent Email</FormLabel>
          <Input
            type="email"
            placeholder="Agent Email"
            value={agentEmail}
            onChange={(e) => setAgentEmail(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Agent Phone</FormLabel>
          <Input
            type="tel"
            placeholder="Agent Phone"
            value={agentPhone}
            onChange={(e) => setAgentPhone(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Images</FormLabel>
          {images === '' ? (
            <UploadDropzone
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {setImages(res[0].url)}}
              onUploadError={() => {
                toast.error('An error occurred while uploading the image');
              }}
            />
          ):(
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="1rem"
            >
              <Image
                src={images}
                width={200}
                height={200}
                alt='Property Image'
              />
            </Box>
          )}
        </FormControl>
        <Flex justifyContent="flex-end">
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default withAuth(List);
