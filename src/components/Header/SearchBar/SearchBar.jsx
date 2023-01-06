import { useState, useEffect } from "react";
import { listVitri, increaseCount } from "../../../slices/homeSlice";
import {
  ActionIcon,
  useMantineTheme,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../utils/useWindowSize";

const SearchBar = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [value, setValue] = useState(null);
  const { danhSachViTri, loading } = useSelector((state) => state.home);
  const tenViTri = danhSachViTri
    ? danhSachViTri.map((item) => ({
        value: item.id,
        label: `${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`,
      }))
    : [];

  useEffect(() => {
    dispatch(listVitri());
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
    <div style={{ position: "relative" }}>
      <Select
        icon={<IconSearch size={18} stroke={1.5} />}
        placeholder="Địa điểm"
        searchable
        nothingFound="Không tìm thấy"
        radius="xl"
        size="md"
        value={value}
        onChange={setValue}
        w={
          size.width > 1144
            ? 600
            : size.width <= 1144 && size.width > 866
            ? 350
            : size.width <= 866 && size.width > 811
            ? 240
            : "auto"
        }
        maxDropdownHeight={280}
        rightSectionWidth={42}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color="pink"
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
        styles={(theme) => ({
          input: {
            "&:focus-within": {
              borderColor: theme.colors.pink[6],
            },
          },
          item: {
            "&[data-selected]": {
              "&, &:hover": {
                backgroundColor: theme.colors.pink[6],
              },
            },

            "&[data-hovered]": {},
          },
        })}
        data={tenViTri}
      />
      <LoadingOverlay visible={loading} overlayBlur={2} loaderProps={{ size: 'md', color: 'pink', variant: 'bars' }}/>
    </div>
  );
};

export default SearchBar;
