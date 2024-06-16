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
import Checkbox from "../molecules/Checkbox";
import CloseButton from "../atoms/CloseButton";

export default function NewTask({ onSubmit, onClose }) {
  return (
    <TaskForm.Provider
      extraInitialValues={{ description: "", already_completed: false }}
      className="h-full w-full"
      onSubmit={async (...args) => {
        const close = await onSubmit(...args);

        if (close) {
          onClose();
        }
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
              right={<CloseButton onClick={onClose} />}
            />
          </CardHeader>

          <CardBody className="h-full overflow-scroll">
            <FormGroup>
              <Label text="Add a description" />
              <Input
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

            <hr className="my-3" />

            <Checkbox
              name="already_completed"
              label="Already completed"
              helpText="Sometimes it is necessary to record tasks that are already completed, if you are faithfully tracking work."
              isChecked={formik.values.already_completed}
              onChange={formik.handleChange}
            />

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
                  onClick={() => formik.setFieldValue("action", "close")}
                >
                  Add task
                </Button>
                <Button
                  type="submit"
                  variant="blue-outline"
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
