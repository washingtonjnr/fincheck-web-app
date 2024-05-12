// Components
import { Header } from "../../components/Header";
// Components (Internal)
import { Fab } from "./components/Fab";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";
// Components - Modals
import { NewAccountModal } from "./modals/NewAccount";
import { EditTransactionModal } from "./modals/EditTransaction";
import { EditAccountModal } from "./modals/EditAccount";
import { NewTransactionModal } from "./modals/NewTransaction";
// Context
import { DashboardContext, DashboardProvider } from "./context/Dashboard";

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited, transactionBeingEdited }) => (
          <>
            {/* Modals */}
            <NewAccountModal />

            <NewTransactionModal />

            {/* Renders only with accountBeingEdited, otherwise the inputs are empty */}
            {accountBeingEdited && <EditAccountModal />}

            {transactionBeingEdited && <EditTransactionModal />}
          </>
        )}
      </DashboardContext.Consumer>

      {/* Content */}
      <div className="w-full h-full flex flex-col gap-4 p-4 md:p-8">
        <Header />

        <main className="flex flex-col md:flex-row flex-1 gap-2 md:gap-4 max-h-full">
          <article className="md:w-1/2 md:h-full">
            <Accounts />
          </article>

          <aside className="md:w-1/2 md:h-full max-h-full">
            <Transactions />
          </aside>
        </main>
      </div>

      <Fab />
    </DashboardProvider>
  );
}
