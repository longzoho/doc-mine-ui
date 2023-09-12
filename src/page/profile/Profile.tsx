import React, {createContext, useContext, useEffect} from 'react';
import {Outlet, useParams} from "react-router-dom";
import {UserProfile} from "../../types";
import {useGoogleAuth} from "../../hook/UseGoogleAuth";
import {useFirebase} from "../../hook/UseFirebase";
import {child, onValue, ref} from "@firebase/database";
import {PageContext} from "../../App";
import ConversationDocumentsContext from "../../component/conversation/ConversationDocumentsContext";


export const ProfileContext = createContext(undefined as UserProfile | undefined);
const Profile = () => {
  const {userId} = useGoogleAuth();
  const {db} = useFirebase();
  const {profile_id} = useParams();
  const [profile, setProfile] = React.useState<UserProfile>();
  const {setPageTitle, setDocumentName, setDocumentSummary, setBreadcrumb} = useContext(PageContext);
  useEffect(() => {
    if (!db || !userId) return;
    const refProfile = ref(db, `users/${userId}/profiles/${profile_id}`);
    const unsubscribe = onValue(refProfile, (snapshot) => {
      const data = snapshot.val() || {};

      /*
      set key as key of object
       */
      setProfile({...data, documents: convertToDocument(data?.documents), profile_id: profile_id});
      setDocumentName(data?.name);
      setDocumentSummary(data?.description);
      setBreadcrumb([{title: 'Home', href: '/'}, {title: 'Profile', href: `/profile/${profile_id}`}]);
    });
    return () => unsubscribe();
  }, [userId, db, setProfile, profile_id, setDocumentName, setDocumentSummary, setBreadcrumb]);
  useEffect(() => setPageTitle && setPageTitle('Profile'), [setPageTitle]);
  return <ProfileContext.Provider value={profile}>
    <ConversationDocumentsContext.Provider value={profile?.documents || []}>
      <Outlet/>
    </ConversationDocumentsContext.Provider>
  </ProfileContext.Provider>;
}

const convertToDocument = (documentsAny: any) => {
  return documentsAny ? Object.keys(documentsAny).map((key) => {
    return {...documentsAny[key], hash_name: key};
  }) : [];
}

export default Profile;