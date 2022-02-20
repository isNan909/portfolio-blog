import { Heading, Stack, Text, Button, Box } from '@chakra-ui/react';

const About = () => {
  return (
    <>
      <Stack
        as={Box}
        textAlign={'left'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={800}
          fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }}
          lineHeight={'110%'}
        >
          Hi, I’m Dylan
          <br />
          <Text as={'span'} color={'gray.500'}>
            self taught designer & developer
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          I love building products that are user friendly and performant.
          Working professionally in the community has been a great experience
          and I’m excited to continue learning and growing as a leader.
        </Text>

        <Text color={'gray.500'}>
          When I was in high school, wondering what would be my major, I saw in
          technology an opportunity to meet people from all over the world and
          that's why I decided to start studying design and programming
          fundamentals even before starting college. Since I started to program,
          I'm a real believer in learning in public and I always try to share
          the knowledge that I gained throughout my journey with the community.
        </Text>

        <Stack
          direction={'column'}
          align={'left'}
          alignSelf={'start'}
          position={'relative'}
        ></Stack>
      </Stack>
    </>
  );
};

export default About;
