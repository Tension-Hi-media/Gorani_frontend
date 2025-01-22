// src/hooks/useGlossaryManager.js
import { useState, useEffect } from "react";
import {
  createGlossary,
  fetchAllGlossaries,
  addWordPair,
  deleteGlossary,
  deleteWordPair,
  updateWordPair,
  updateGlossaryName,
} from "../Apis/TranslateAPI";

export default function useGlossaryManager(userInfo) {
  const [showGlossaryList, setShowGlossaryList] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [glossaryList, setGlossaryList] = useState([]);
  const [defaultGlossary, setDefaultGlossary] = useState(null);
  const [selectedGlossary, setSelectedGlossary] = useState({
    name: "",
    words: [],
  });
  const [editingGlossary, setEditingGlossary] = useState(null);
  const [isGlossaryEnabled, setIsGlossaryEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // glossaryList가 변경될 때 기본 용어집과 선택된 용어집 초기화
  useEffect(() => {
    if (glossaryList.length > 0) {
      const defaultGlossaryItem = glossaryList.find(
        (glossary) => glossary.name === "기본"
      );
      const glossaryToSelect = defaultGlossaryItem || glossaryList[0];
      const safeGlossary = {
        ...glossaryToSelect,
        words: glossaryToSelect.words || [],
      };
      setDefaultGlossary(safeGlossary.name || "기본");
      setSelectedGlossary(safeGlossary);
    } else {
      setDefaultGlossary(null);
      setSelectedGlossary({ name: "", words: [] });
    }
  }, [glossaryList]);

  // 컴포넌트 마운트 시 용어집 목록 로드
  useEffect(() => {
    async function loadGlossaries() {
      try {
        const glossaries = await fetchAllGlossaries(userInfo.id);
        setGlossaryList(glossaries);
      } catch (err) {
        console.error("용어집 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    }
    if (userInfo && userInfo.id) {
      loadGlossaries();
    }
  }, [userInfo]);

  // GlossaryList 관련 핸들러
  const toggleGlossaryList = () => setShowGlossaryList((prev) => !prev);
  const handleOpenModal = () => setIsGlossaryModalOpen(true);
  const handleCloseModal = () => setIsGlossaryModalOpen(false);

  const handleCreateGlossary = async (name) => {
    try {
      const glossaryData = { name, userId: userInfo.id, words: [] };
      const createdGlossary = await createGlossary(glossaryData);

      if (createdGlossary && createdGlossary._id) {
        setGlossaryList((prevList) => [...prevList, createdGlossary]);
        alert(`"${createdGlossary.name}" 용어집이 생성되었습니다.`);
      } else {
        console.error("용어집 생성 후 ID가 반환되지 않았습니다.");
      }
    } catch (error) {
      alert("용어집 생성에 실패했습니다.");
    }
  };

  const handleDeleteGlossary = async (id) => {
    if (!id) {
      console.error("용어집 ID가 없습니다.");
      return;
    }
    try {
      await deleteGlossary(id);
      setGlossaryList((prev) => prev.filter((glossary) => glossary._id !== id)); // `_id` 기준으로 상태 업데이트
      alert("용어집 삭제 성공");
    } catch (error) {
      console.error("용어집 삭제 실패:", error);
      alert("용어집 삭제에 실패했습니다.");
    }
  };

  const handleSelectGlossary = (glossary) => {
    if (!glossary.id) {
      alert("해당 용어집에는 ID가 없습니다.");
      return;
    }
    setSelectedGlossary(glossary);
    setIsDirty(false);
  };

  const handleSetDefaultGlossary = (name) => {
    setDefaultGlossary(name);
    alert(`"${name}"이(가) 기본 용어집으로 설정되었습니다.`);
  };

  const handleEditGlossaryName = (glossary) => {
    setEditingGlossary(glossary._id); // 편집 중인 용어집의 ID를 설정
  };

  const handleFinishEditGlossaryName = async (glossary) => {
    try {
      await updateGlossaryName(glossary._id, glossary.name); // API 호출
      setEditingGlossary(null); // 편집 모드 해제
      alert("용어집 이름이 수정되었습니다.");
    } catch (error) {
      console.error("용어집 이름 수정 실패:", error);
      alert("이름 수정에 실패했습니다.");
    }
  };
  
  const handleChangeGlossaryName = (event, glossary) => {
    const newName = event.target.value.trim();
    
    if (!newName) {
      alert("용어집 이름은 비어 있을 수 없습니다.");
      return;
    }
  
    // 중복 이름 확인
    if (glossaryList.some((item) => item.name === newName)) {
      alert("중복된 이름은 허용되지 않습니다.");
      return;
    }
  
    // 상태 업데이트
    setGlossaryList((prev) =>
      prev.map((item) =>
        item._id === glossary._id ? { ...item, name: newName } : item
      )
    );
  
    // 현재 선택된 용어집 이름 동기화
    if (selectedGlossary?._id === glossary._id) {
      setSelectedGlossary((prev) => ({ ...prev, name: newName }));
    }
  };
  

  const handleBlurGlossaryName = async (glossary) => {
    try {
      if (!glossary.name.trim()) {
        alert("용어집 이름은 비어 있을 수 없습니다.");
        return;
      }
      await updateGlossaryName(glossary._id, glossary.name); // FastAPI에 업데이트 요청
      alert("용어집 이름이 업데이트되었습니다.");
      setEditingGlossary(null);
    } catch (error) {
      console.error("용어집 이름 업데이트 실패:", error);
      alert("업데이트 실패");
    }
  };
  

  // WordPairEditor 관련 핸들러
  const handleAddWordPair = () => {
    if (!selectedGlossary || !selectedGlossary.id) {
      alert("용어집을 선택해주세요.");
      return;
    }
    const updatedGlossary = {
      ...selectedGlossary,
      words: [...selectedGlossary.words, { start: "", arrival: "" }],
    };
    setSelectedGlossary(updatedGlossary);
    setGlossaryList((prev) =>
      prev.map((g) => (g.id === selectedGlossary.id ? updatedGlossary : g))
    );
  };

  const handleSaveWordPair = async (index) => {
    const newWordPair = selectedGlossary.words[index];
    if (!newWordPair.start || !newWordPair.arrival) {
      alert("출발 단어와 도착 단어를 모두 입력해주세요.");
      return;
    }

    setIsSaving(index);
    try {
      const savedWordPair = await addWordPair(selectedGlossary.id, newWordPair);
      setGlossaryList((prev) =>
        prev.map((g) =>
          g.id === selectedGlossary.id
            ? { ...g, words: [...g.words, savedWordPair] }
            : g
        )
      );
      alert("단어쌍이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("단어쌍 저장 실패:", error);
      alert("단어쌍 저장에 실패했습니다.");
    } finally {
      setIsSaving(null);
    }
  };

  const handleUpdateWordPair = async (index) => {
    const updatedWordPair = selectedGlossary.words[index];
    if (!updatedWordPair.start || !updatedWordPair.arrival) {
      alert("출발 단어와 도착 단어를 모두 입력해주세요.");
      return;
    }

    try {
      await updateWordPair(
        selectedGlossary.id,
        updatedWordPair._id,
        updatedWordPair
      );
      setGlossaryList((prev) =>
        prev.map((g) =>
          g.id === selectedGlossary.id
            ? {
                ...g,
                words: g.words.map((word, idx) =>
                  idx === index ? updatedWordPair : word
                ),
              }
            : g
        )
      );
      alert("단어쌍 수정이 완료되었습니다.");
    } catch (error) {
      console.error("단어쌍 수정 실패:", error);
      alert("단어쌍 수정에 실패했습니다.");
    }
  };

  const handleDeleteWord = async (index) => {
    if (!selectedGlossary || !selectedGlossary.id) {
      alert("용어집을 선택해주세요.");
      return;
    }
    if (window.confirm("이 단어쌍을 삭제하시겠습니까?")) {
      try {
        await deleteWordPair(selectedGlossary.id, index);
        const updatedWords = selectedGlossary.words.filter(
          (_, i) => i !== index
        );
        const updatedGlossary = { ...selectedGlossary, words: updatedWords };
        setSelectedGlossary(updatedGlossary);
        setGlossaryList((prev) =>
          prev.map((g) => (g.id === selectedGlossary.id ? updatedGlossary : g))
        );
        alert("단어쌍이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("단어쌍 삭제 실패:", error);
        alert("단어쌍 삭제에 실패했습니다.");
      }
    }
  };

  const handleChangeWordPair = (index, field, value) => {
    const updatedWords = [...selectedGlossary.words];
    updatedWords[index][field] = value;

    const updatedGlossary = { ...selectedGlossary, words: updatedWords };
    setSelectedGlossary(updatedGlossary);
    setGlossaryList((prev) =>
      prev.map((g) => (g.id === selectedGlossary.id ? updatedGlossary : g))
    );
    setIsDirty(true);
  };

  // Hook이 노출할 값들을 모아서 반환
  return {
    // 상태
    showGlossaryList,
    isGlossaryModalOpen,
    glossaryList,
    defaultGlossary,
    selectedGlossary,
    editingGlossary,
    isGlossaryEnabled,
    isSaving,
    isDirty,
    isLoading,

    // setter
    setIsGlossaryEnabled,

    // GlossaryList 핸들러
    toggleGlossaryList,
    handleOpenModal,
    handleCloseModal,
    handleCreateGlossary,
    handleDeleteGlossary,
    handleSelectGlossary,
    handleSetDefaultGlossary,
    handleEditGlossaryName,
    handleChangeGlossaryName,
    handleBlurGlossaryName,
    handleFinishEditGlossaryName,

    // WordPairEditor 핸들러
    handleAddWordPair,
    handleSaveWordPair,
    handleUpdateWordPair,
    handleDeleteWord,
    handleChangeWordPair,
  };
}
