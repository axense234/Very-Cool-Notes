// React Icons
import { FiFolderPlus } from "react-icons/fi";
// Components
import CreateFolderModal from "../Modals/CreateFolderModal";
// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectAllFolders } from "../../redux/slices/foldersSlice";
import {
  selectSelectedShownFolder,
  setSelectedShownFolder,
  setShowCreateFolderModal,
} from "../../redux/slices/generalSlice";

const GalleryOptions: React.FC = () => {
  const folders = useAppSelector(selectAllFolders);
  const dispatch = useAppDispatch();
  const selectedShownFolder = useAppSelector(selectSelectedShownFolder);

  return (
    <section className='gallery-container__options'>
      <div className='gallery-container__choose-folder'>
        <FiFolderPlus
          onClick={() => {
            dispatch(setShowCreateFolderModal(true));
          }}
          id='create-folder'
        />

        <CreateFolderModal />
        <form className='gallery-container__choose-folder-form'>
          <label htmlFor='folder'>Current Folder:</label>
          <select
            name='folder'
            id='folder'
            value={selectedShownFolder}
            onChange={(e) => {
              dispatch(setSelectedShownFolder(e.target.value));
            }}
          >
            <option value='home'>Home</option>
            {folders?.map((folder) => {
              return (
                <option value={folder.folder_uid} key={folder.folder_uid}>
                  {folder.label}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      {/* <div className='gallery-container__sort-notes'>
        <AiOutlineArrowDown />
        <select name='sort-notes' id='sort-notes'>
          <option value='createdAt'>createdAt</option>
        </select>
      </div> */}
      {/* <div className='gallery-container__search-notes-control'>
        <input
          type='text'
          placeholder='ex:My Cool Note'
          id='notes-search'
          name='notes-search'
        />
        <label htmlFor='notes-search'>
          <button type='submit'>
            <HiMagnifyingGlass />
          </button>
        </label>
      </div> */}
    </section>
  );
};

export default GalleryOptions;
