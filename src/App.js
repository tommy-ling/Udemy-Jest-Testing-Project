import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary and order entry pages need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not need the provider */}
    </Container>
  );
}

export default App;
