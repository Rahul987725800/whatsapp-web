import styles from "./ProfileDrawerContent.module.scss";
import Image from "next/image";
import { MdEdit, MdCheck } from "react-icons/md";
import { IconType } from "react-icons/lib";
import TextareaAutosize from "react-textarea-autosize";
import { useRef, useState } from "react";
import produce from "immer";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useMutation } from "urql";
import { setUser } from "store/reducers/generalReducer";
type FieldProps = {
  key: string;
  value: string;
  error: string;
  editing: boolean;
  placeholder: string;
  label: string;
  maxRows: number;
  maxLength: number;
  update: (v: string) => void;
};
const updateProfileMutation = `
mutation($data: updateProfileInput) {
  updateProfile(_id:"61d97db69b0201a56c0c30d9", data: $data) {
    _id
    about
    profilePhotoUrl
    status
    userId
  }
}
`;
const updateUserMutation = `
  mutation($_id: ID, $data: updateUserInput) {
  updateUser(_id: $_id, data: $data) {
    name
  }
}
`;
interface ProfileDrawerContentProps {}
const ProfileDrawerContent = ({}: ProfileDrawerContentProps) => {
  const user = useAppSelector((state) => state.general.user);
  const [updateProfileResult, updateProfile] = useMutation(
    updateProfileMutation
  );
  const [updateUserResult, updateUser] = useMutation(updateUserMutation);
  const dispatch = useAppDispatch();
  const [details, setDetails] = useState<{ [key: string]: FieldProps }>({
    name: {
      key: "name",
      value: user!.name,
      error: "",
      editing: false,
      placeholder: "Name",
      label: "Your name",
      maxRows: 1,
      maxLength: 52,
      update: async (newValue) => {
        // console.log(this.value);
        const result = await updateUser({
          _id: user!._id,
          data: {
            name: newValue,
          },
        });
        // console.log(result);
        dispatch(
          setUser({
            ...user!,
            ...result.data?.updateUser,
          })
        );
      },
    },
    about: {
      key: "about",
      value: user!.profile?.about || "Hey there! I am using WhatsApp.",
      error: "",
      editing: false,
      placeholder: "About",
      label: "About",
      maxRows: 3,
      maxLength: Infinity,
      update: async (newValue) => {
        // console.log(this.value);
        const result = await updateProfile({
          _id: user!.profile?._id,
          data: {
            about: newValue,
          },
        });
        // console.log(result);
        dispatch(
          setUser({
            ...user!,
            profile: result.data.updateProfile,
          })
        );
      },
    },
  });
  type detailsKey = keyof typeof details;
  return (
    <div className={styles.ProfileDrawerContent}>
      <div className={styles.imageContainer}>
        <Image src="/profile.jpg" layout="fill" alt="profile picture" />
      </div>
      {Object.keys(details).map((v) => {
        const key: detailsKey = v as any;
        return (
          <InputBlock key={key} field={details[key]} setDetails={setDetails} />
        );
      })}
    </div>
  );
};
export default ProfileDrawerContent;
interface InputBlockProps {
  field: FieldProps;
  setDetails: React.Dispatch<
    React.SetStateAction<{
      [key: string]: FieldProps;
    }>
  >;
}
const InputBlock = ({ field, setDetails }: InputBlockProps) => {
  const update = () => {
    // console.log(`update ${field.label} with ${field.value}`);
    field.update(field.value);
  };
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className={styles.inputBlock}>
      <label>{field.label}</label>
      <div className={styles.inputContainer}>
        <TextareaAutosize
          ref={textAreaRef}
          className={classNames(styles.textArea, {
            [styles.editing]: field.editing,
          })}
          onFocus={() => {
            // console.log("focus");
            if (!field.editing) textAreaRef.current?.blur();
          }}
          placeholder={field.placeholder}
          value={field.value}
          maxRows={field.maxRows}
          maxLength={field.maxLength}
          onChange={(e) => {
            if (field.editing) {
              setDetails((prev) =>
                produce(prev, (draft) => {
                  draft[field.key].value = e.target.value;
                })
              );
            }
          }}
        />

        <span
          className={classNames({
            [styles.iconContainer]: true,
            [styles.confirm]: field.editing,
          })}
          onClick={() => {
            if (field.editing) {
              update();
            } else {
              setTimeout(() => {
                if (textAreaRef.current) {
                  textAreaRef.current.selectionStart = field.value.length;
                  textAreaRef.current.focus();
                }
              });
            }
            setDetails((prev) =>
              produce(prev, (draft) => {
                draft[field.key].editing = !draft[field.key].editing;
              })
            );
          }}
        >
          <EditToggleIcon Icon={MdCheck} show={field.editing} />
          <EditToggleIcon Icon={MdEdit} show={!field.editing} />
        </span>
      </div>
    </div>
  );
};
interface EditToggleIconProps {
  Icon: IconType;
  show: boolean;
}
const EditToggleIcon = ({ Icon, show }: EditToggleIconProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.1, delay: 0.1 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className={styles.icon}
        >
          <Icon color="#a8aaac" size={22} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
