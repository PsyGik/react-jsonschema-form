import "./App.css";
import JSONEditor from "./TabEditor";
import JsonReactForm from "./JsonReactForm";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import useFormStore from "./store";
import { debounce } from "./utils";

const onDataChanged =
  (save) =>
  ({ errors, formData }) => {
    if (errors.length === 0) {
      debounce(save(formData));
    }
  };

const Preview = () => {
  const schema = useFormStore((state) => state.schema);
  const uiSchema = useFormStore((state) => state.uiSchema);
  const data = useFormStore((state) => state.data);
  const saveData = useFormStore((state) => state.saveData);

  return (
    <JsonReactForm
      schema={schema}
      uiSchema={uiSchema}
      data={data}
      onChange={onDataChanged(saveData)}
    />
  );
};

const App = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            React JSON Schema Form Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Card>
              <JSONEditor />
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card
              sx={{ px: 2, maxHeight: "calc(90vh - 64px)", overflow: "auto" }}
            >
              <Preview />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
