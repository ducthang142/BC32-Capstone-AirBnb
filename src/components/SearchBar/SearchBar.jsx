import { useState, useEffect } from "react";
import vitriAPI from "../../services/vitriAPI";
import { ActionIcon, useMantineTheme, Select } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { increaseCount } from "../../slices/homeSlice";
import { useDispatch } from "react-redux";
import useWindowSize from "../../utils/useWindowSize";

const SearchBar = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [value, setValue] = useState(null);
  const [viTri, setViTri] = useState([]);
  const tenViTri = viTri?.map((item) => ({
    value: item.id,
    label: `${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`,
  }));

  useEffect(() => {
    (async () => {
      try {
        const data = await vitriAPI.getViTri();
        setViTri(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSearch = () => {
    if (!value) {
      alert("Không có vị trí để kiếm");
    } else {
      navigate(`/danhsachphong/${value}`);
      dispatch(increaseCount());
    }
  };

  return (
    <div>
      <Select
        icon={<IconSearch size={18} stroke={1.5} />}
        placeholder="Địa điểm"
        searchable
        nothingFound="Không tìm thấy"
        radius="xl"
        size="md"
        value={value}
        onChange={setValue}
        w={size.width > 1100 ? 600 : size.width > 820 ? 350 : 300}
        maxDropdownHeight={280}
        rightSectionWidth={42}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            onClick={() => handleSearch()}
          >
            {theme.dir === "ltr" ? (
              <IconArrowRight size={18} stroke={1.5} />
            ) : (
              <IconArrowLeft size={18} stroke={1.5} />
            )}
          </ActionIcon>
        }
        data={tenViTri}
      />
    </div>
  );
};

export default SearchBar;
