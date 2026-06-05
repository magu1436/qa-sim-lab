import { Box, Button, Stack, Typography, type SxProps } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useCallback, useEffect, useState, type FC } from "react";

interface FileInputFieldProps {
  file?: File | null;
  accept?: string[];
  onChange?: (file: File | null) => void;
  buttonLabel?: string;
  errorMessage?: string;
}

const boxSx: SxProps = {
  border: "1px dashed",
  borderRadius: 1,
  padding: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
};

const DEFAULT_BORDER_COLOR = "divider";
const BORDER_COLORS = {
  error: "error.main",
  over: "primary.main",
  default: DEFAULT_BORDER_COLOR,
};

const FileInputField: FC<FileInputFieldProps> = ({
  file,
  accept = [],
  onChange,
  buttonLabel = "ファイルを選択",
  errorMessage,
}) => {
  const [innerErrorMessage, setInnerErrorMessage] = useState<string>("");
  useEffect(() => {
    setInnerErrorMessage(errorMessage || "");
  }, [errorMessage]);

  const [validatedFile, setValidatedFile] = useState<File | null>(null);
  useEffect(() => {
    setValidatedFile(file || null);
  }, [file]);

  const [isDragging, setIsDragging] = useState(false);

  const setSelectedFile = useCallback(
    (file: File | null) => {
      const { isValid, errorCode } = __validate(file, accept);
      switch (errorCode) {
        case "INVALID_EXTENSION":
          setInnerErrorMessage("拡張子は" + accept.join(",") + "のみ受け付けます");
          break;
        case "":
          setInnerErrorMessage("");
      }
      const validatedFile = isValid ? file : null;
      setValidatedFile(validatedFile);
      if (isValid) onChange?.(validatedFile);
    },
    [accept, onChange, setInnerErrorMessage, setValidatedFile],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setSelectedFile(selectedFile);
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget;
    if ((relatedTarget instanceof Node && currentTarget.contains(relatedTarget))) return;
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const selectedFile = e.dataTransfer.files?.[0] ?? null;
      setSelectedFile(selectedFile);
      setIsDragging(false);
    },
    [setSelectedFile, setIsDragging],
  );

  return (
    <Stack spacing={1}>
      <Box
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          ...boxSx,
          borderColor:
            (isDragging && BORDER_COLORS.over) ||
            (innerErrorMessage && BORDER_COLORS.error) ||
            BORDER_COLORS.default,
        }}
      >
        <UploadFileIcon />

        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          ここにファイルをドロップ
        </Typography>

        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ whiteSpace: "nowrap" }}
        >
          {buttonLabel}
          <input
            type="file"
            hidden
            onChange={handleInputChange}
            accept={accept.join(",") || undefined}
          />
        </Button>
      </Box>

      {validatedFile && (
        <Typography variant="body2" sx={{ maxWidth: 320, overflowWrap: "anywhere" }}>
          選択中： {validatedFile.name} ({validatedFile.size.toLocaleString()} bytes)
        </Typography>
      )}

      {innerErrorMessage && (
        <Typography variant="body2" color="error">
          {innerErrorMessage}
        </Typography>
      )}
    </Stack>
  );
};

interface ValidateResult {
  isValid: boolean;
  errorCode: ValidateErrorCode;
}

type ValidateErrorCode = "" | "INVALID_EXTENSION";

const __validate = (file: File | null, accept: string[]): ValidateResult => {
  if (!file) return { isValid: true, errorCode: "" };
  for (let extension of accept) {
    if (file.name.endsWith(extension)) return { isValid: true, errorCode: "" };
  }
  return { isValid: false, errorCode: "INVALID_EXTENSION" };
};

export default FileInputField;
