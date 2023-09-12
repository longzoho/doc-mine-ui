import React, {useState, createContext, useEffect} from 'react';
import './App.css';
import Home from "./page/Home";
import Login from "./page/Login";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {useGoogleAuth} from "./hook/UseGoogleAuth";
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import Document from "./page/document/Document";
import Root from "./page/Root";
import {QueryClient, QueryClientProvider} from "react-query";
import WebFont from "webfontloader";
import {Conversation, UserDocument} from "./types";
import {ConfigProvider} from 'antd';
import DocumentDetail from "./page/document/DocumentDetail";
import NewDocumentConversation from "./page/document/NewDocumentConversation";
import ChatDocumentConversation from "./page/document/ChatDocumentConversation";
import Profile from "./page/profile/Profile";
import ProfileList from "./component/profile/ProfileList";
import ProfileDetail from "./component/profile/ProfileDetail";
import NewProfileConversation from "./page/profile/NewProfileConversation";
import ChatProfileConversation from "./page/profile/ChatProfileConversation";

interface BreadcrumbItemType {
  title: string,
  href: string
}

interface PageContextType {
  pageTitle: string,
  setPageTitle: (title: string) => void,
  documentName?: string,
  setDocumentName: (name: string | undefined) => void,
  documentSummary?: string,
  setDocumentSummary: (summary: string | undefined) => void,
  showSidebar?: boolean,
  setShowSidebar: (show: boolean) => void,
  conversations?: Conversation[],
  setConversations: (conversations: Conversation[] | undefined) => void,
  breadcrumb?: BreadcrumbItemType[],
  setBreadcrumb: (breadcrumb: BreadcrumbItemType[]) => void,
  documents?: UserDocument[],
  setDocuments: (documents: UserDocument[]) => void,
}

export const PageContext = createContext({} as PageContextType);

const queryClient = new QueryClient()

function App() {
  const {userId} = useGoogleAuth();
  const [pageTitle, setPageTitle] = useState('Home');
  const [documentName, setDocumentName] = useState(undefined as string | undefined);
  const [documentSummary, setDocumentSummary] = useState(undefined as string | undefined);
  const [showSidebar, setShowSidebar] = useState(true);
  const [conversations, setConversations] = useState<Conversation[] | undefined>(undefined);
  const [breadcrumb, setBreadcrumb] = useState([] as BreadcrumbItemType[]);
  const [documents, setDocuments] = useState([] as UserDocument[]);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Oswald', 'sans-serif']
      }
    });
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ConfigProvider theme={theme} >
          <QueryClientProvider client={queryClient}>
            <PageContext.Provider
              value={{
                pageTitle,
                setPageTitle,
                documentName,
                setDocumentName,
                documentSummary,
                setDocumentSummary,
                showSidebar,
                setShowSidebar,
                conversations,
                setConversations,
                breadcrumb,
                setBreadcrumb,
                documents,
                setDocuments,
              }}>
              <BrowserRouter>
                <Routes>
                  {userId ?
                    <Route path={'/'} element={<Root/>} key={'root'}>
                      <Route path={'/'} element={<Home/>} key={'home'}/>
                      <Route path={'/document/:document_id'} element={<Document/>} key={'document'}>
                        <Route path={'/document/:document_id'} element={<DocumentDetail/>}
                               key={'document-detail'}/>
                        <Route path={'/document/:document_id/new-conversation'} element={<NewDocumentConversation/>}
                               key={'new-document-conversation'}/>
                        <Route path={'/document/:document_id/conversation/:conversation_id'}
                               element={<ChatDocumentConversation/>} key={'chat-document-conversation'}/>
                      </Route>
                      <Route path={'/profiles'} element={<Profile/>} key={'profile'}>
                        <Route path={'/profiles'} element={<ProfileList/>} key={'profileList'}/>
                      </Route>
                      <Route path={'/profile'} element={<Profile/>} key={'profile'}>
                        <Route path={'/profile/:profile_id'} element={<ProfileDetail/>} key={'profileDetail'}/>
                        <Route path={'/profile/:profile_id/new-conversation'} element={<NewProfileConversation/>}
                               key={'new-profile-conversation'}/>
                        <Route path={'/profile/:profile_id/conversation/:conversation_id'}
                               element={<ChatProfileConversation/>} key={'chat-profile-conversation'}/>
                      </Route>
                    </Route> : <Route path={'/'} element={<Login/>}/>}
                </Routes>
              </BrowserRouter>
            </PageContext.Provider>
          </QueryClientProvider>
        </ConfigProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
