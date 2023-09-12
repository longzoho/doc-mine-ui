import React, {createContext, useContext, useEffect, useState} from "react";
import {useGoogleAuth} from "../../hook/UseGoogleAuth";
import {Outlet, useParams} from "react-router-dom";
import {useFirebase} from "../../hook/UseFirebase";
import {child, onValue, ref} from "@firebase/database";
import {UserDocument} from "../../types";
import {PageContext} from "../../App";
import ConversationDocumentsContext from "../../component/conversation/ConversationDocumentsContext";

export const DocumentContext = createContext({} as UserDocument | undefined);
export default function Document() {
  const {userId} = useGoogleAuth();
  const {db} = useFirebase();
  const {document_id} = useParams();
  const [document, setDocument] = useState<UserDocument>()
  const {setPageTitle, setDocumentName, setDocumentSummary, setBreadcrumb} = useContext(PageContext);
  useEffect(() => {
    setPageTitle('Document');
  }, [setPageTitle]);
  useEffect(() => {
    if (!db || !userId) return;
    const refUser = ref(db, `users/${userId}`);
    const refDocument = child(refUser, `documents/${document_id}`);
    const unsubscribe = onValue(refDocument, (snapshot) => {
      const data = snapshot.val() || {};

      /*
      set key as key of object
       */
      setDocument({...data, key: document_id, hash_name: document_id});
      setDocumentName(data?.name);
      setDocumentSummary(data?.summary);
      setBreadcrumb([{title: 'Home', href: '/'}, {title: 'Document', href: `/document/${document_id}`}]);
    });
    return () => unsubscribe();
  }, [userId, db, document_id, setDocumentName, setDocumentSummary, setDocument, setBreadcrumb]);
  return (
    <DocumentContext.Provider value={document}>
      <ConversationDocumentsContext.Provider value={document ? [document] : []}>
        <Outlet/>
      </ConversationDocumentsContext.Provider>
    </DocumentContext.Provider>
  )
}
