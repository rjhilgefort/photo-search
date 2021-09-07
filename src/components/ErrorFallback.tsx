import {Button, Heading, Spacer, VStack} from '@chakra-ui/react'
import React from 'react'
import {FallbackProps} from 'react-error-boundary'

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <VStack role="alert" paddingTop={10}>
    <Heading size="md">Something went wrong:</Heading>
    <Spacer />
    <pre>{error.message}</pre>
    <Spacer />
    <Button color="white" bg="red" onClick={resetErrorBoundary}>
      Try Again
    </Button>
  </VStack>
)
