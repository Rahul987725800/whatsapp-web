import styles from "./ProfileDrawerContent.module.scss";
import Image from "next/image";
import { MdEdit, MdCheck } from "react-icons/md";
import { IconType } from "react-icons/lib";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import { useState } from "react";
import produce from "immer";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
type FieldProps = {
  key: string;
  value: string;
  error: string;
  editing: boolean;
  placeholder: string;
  label: string;
  maxRows: number;
  maxLength: number;
};
interface ProfileDrawerContentProps {}
const ProfileDrawerContent = ({}: ProfileDrawerContentProps) => {
  const [details, setDetails] = useState<{ [key: string]: FieldProps }>({
    name: {
      key: "name",
      value: "",
      error: "",
      editing: false,
      placeholder: "Name",
      label: "Your name",
      maxRows: 1,
      maxLength: 52,
    },
    about: {
      key: "about",
      value: "",
      error: "",
      editing: false,
      placeholder: "About",
      label: "About",
      maxRows: 3,
      maxLength: Infinity,
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
          <InputBlock
            key={key}
            fieldDetails={details[key]}
            setDetails={setDetails}
          />
        );
      })}
    </div>
  );
};
export default ProfileDrawerContent;
interface InputBlockProps {
  fieldDetails: FieldProps;
  setDetails: React.Dispatch<
    React.SetStateAction<{
      [key: string]: FieldProps;
    }>
  >;
}
const InputBlock = ({ fieldDetails, setDetails }: InputBlockProps) => {
  const update = () => {
    console.log(`update ${fieldDetails.label} with ${fieldDetails.value}`);
  };
  return (
    <div className={styles.inputBlock}>
      <label>{fieldDetails.label}</label>
      <div className={styles.inputContainer}>
        <TextareaAutosize
          className={styles.textArea}
          placeholder={fieldDetails.placeholder}
          value={fieldDetails.value}
          maxRows={fieldDetails.maxRows}
          maxLength={fieldDetails.maxLength}
          onChange={(e) => {
            if (fieldDetails.editing) {
              setDetails((prev) =>
                produce(prev, (draft) => {
                  draft[fieldDetails.key].value = e.target.value;
                })
              );
            }
          }}
        />

        <span
          className={classNames({
            [styles.iconContainer]: true,
            [styles.confirm]: fieldDetails.editing,
          })}
          onClick={() => {
            if (fieldDetails.editing) {
              update();
            }
            setDetails((prev) =>
              produce(prev, (draft) => {
                draft[fieldDetails.key].editing =
                  !draft[fieldDetails.key].editing;
              })
            );
          }}
        >
          <EditToggleIcon Icon={MdCheck} show={fieldDetails.editing} />
          <EditToggleIcon Icon={MdEdit} show={!fieldDetails.editing} />
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
