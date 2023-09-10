import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import type { Instance } from "@slime-launcher/piston";
import { useRef } from "react";
import { useMainMutation } from "../../../hooks/main";

interface Props {
  instance: Instance;
}

export const DeleteInstanceItem: React.FC<Props> = ({ instance }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteInstance = useMainMutation("deleteInstance");
  const cancelRef = useRef(null);
  const onDelete = () => {
    deleteInstance.mutateAsync(instance.path).then(() => onClose());
  };

  return (
    <>
      <MenuItem background="red.200" color="gray.800" onClick={onOpen}>
        Delete
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Instance
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onDelete}
                ml={3}
                isLoading={deleteInstance.isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
