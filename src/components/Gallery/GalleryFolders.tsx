// React Icons
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
// React Router
import { Link } from "react-router-dom";
// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// Redux
import { selectFolderIds } from "../../redux/slices/foldersSlice";
import {
  selectToggles,
  setShowCreateFolderModal,
  setToggle,
} from "../../redux/slices/generalSlice";
// Components
import Folder from "./Folder";

const GalleryFolders: React.FC = () => {
  const foldersIds = useAppSelector(selectFolderIds);
  const toggles = useAppSelector(selectToggles);
  const dispatch = useAppDispatch();

  return (
    <section className='gallery-container__folders-container'>
      <div className='gallery-container__folders-container-title'>
        {toggles.folders ? (
          <GoTriangleDown
            onClick={() =>
              dispatch(setToggle({ property: "folders", value: false }))
            }
          />
        ) : (
          <GoTriangleRight
            onClick={() =>
              dispatch(setToggle({ property: "folders", value: true }))
            }
          />
        )}
        <p>
          Folders
          {`(${foldersIds?.length})`}
        </p>
      </div>
      {toggles.folders && (
        <ul className='gallery-container__folders'>
          {(foldersIds?.length as number) < 1 ? (
            <p id='no-folders'>
              -No folders found,but you can create one{" "}
              <Link
                to='#create-folder'
                onClick={() => dispatch(setShowCreateFolderModal(true))}
              >
                here
              </Link>
            </p>
          ) : (
            foldersIds?.map((folderId) => {
              return <Folder id={folderId as string} key={folderId} />;
            })
          )}
        </ul>
      )}
    </section>
  );
};

export default GalleryFolders;
