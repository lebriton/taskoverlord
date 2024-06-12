import { XMarkIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../contexts/ToastContext";
import { invoke } from "@tauri-apps/api/tauri";
import Button, { ButtonList } from "../atoms/Button";
import Card, { CardBody, CardFooter, CardHeader } from "../molecules/Card";
import FlexLine from "../molecules/FlexLine";
import Heading2 from "../molecules/Heading2";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import FormGroup from "../atoms/FormGroup";
import TextArea from "../atoms/TextArea";
import TaskForm from "../../forms/TaskForm";
import { useFormikContext } from "formik";

export default function NewTask({ onClose }) {
  const queryClient = useQueryClient();
  const addToast = useToast();

  return (
    <TaskForm.Provider
      extraInitialValues={{ description: "" }}
      className="h-full w-full"
      onSubmit={(values, actions) => {
        invoke("add_task", { description: values.description }).then(() => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });

          if (values.action != "continue") onClose();
          actions.resetForm();

          addToast(`New task '${values.description}' added.`, "success");
        });
      }}
    >
      {(formik) => (
        <Card className="h-full" hasExternalBorder={false}>
          <CardHeader>
            <FlexLine
              left={
                /* NB: !mb-px to align borders */
                <Heading2 className="!mb-px" title={"New task"} />
              }
              right={
                <Button variant="plain" Icon={XMarkIcon} onClick={onClose} />
              }
            />
          </CardHeader>

          <CardBody className="h-full overflow-scroll">
            <FormGroup>
              <Label text="Add a description" />
              <TextArea
                name="description"
                value={formik.values.description}
                rows={2}
                autoFocus
                isRequired
                onChange={formik.handleChange}
              />
            </FormGroup>

            <hr className="my-3" />

            <TaskForm.Component />

            {/* spacer */}
            <div className="h-20" />
          </CardBody>

          <CardFooter>
            <div className="flex justify-end">
              <ButtonList>
                <Button isDisabled={formik.isSubmitting} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="blue"
                  isDisabled={formik.isSubmitting}
                >
                  Add task
                </Button>
                <Button
                  type="submit"
                  variant="blue"
                  isDisabled={formik.isSubmitting}
                  onClick={() => formik.setFieldValue("action", "continue")}
                >
                  Add task and continue
                </Button>
              </ButtonList>
            </div>
          </CardFooter>
        </Card>
      )}
    </TaskForm.Provider>
  );
}
