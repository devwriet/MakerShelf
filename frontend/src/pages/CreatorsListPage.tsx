import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  CreatorApiError,
  deleteCreator,
  listCreators,
  type CreatorResponse,
} from "@/lib/api/creators"
import { CreatorsLayout } from "@/components/creators/CreatorsLayout"
import { Button } from "@/components/ui/button"

export function CreatorsListPage() {
  const [creators, setCreators] = useState<CreatorResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    void listCreators()
      .then((data) => {
        if (isMounted) setCreators(data)
      })
      .catch(() => {
        if (isMounted) setError("창작자를 불러오지 못했어요")
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`${name}을(를) 삭제하시겠어요?`)) return

    try {
      await deleteCreator(id)
      setCreators((current) => current.filter((creator) => creator.id !== id))
    } catch (error) {
      if (error instanceof CreatorApiError && error.status === 404) {
        setCreators((current) => current.filter((creator) => creator.id !== id))
      } else {
        setDeleteError("창작자를 삭제하지 못했어요")
      }
    }
  }

  return (
    <CreatorsLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-12">
        <h1 className="text-center text-3xl font-bold">창작자 관리</h1>
        <p className="mt-2 text-center text-[15px] text-black/60">
          등록된 창작자를 조회하고 관리해요
        </p>
        <Button asChild className="mt-6 rounded-full bg-[#0088FF] hover:bg-[#0088FF]/90">
          <Link to="/creators/new">+ 새 창작자</Link>
        </Button>

        {deleteError && <p role="status">{deleteError}</p>}

        {isLoading ? (
          <p className="mt-12 text-center">불러오는 중...</p>
        ) : error ? (
          <p className="mt-12 text-center" role="status">{error}</p>
        ) : creators.length === 0 ? (
          <p className="mt-12 text-center" role="status">등록된 창작자가 없어요</p>
        ) : (
          <div className="mt-12 w-full overflow-x-auto">
            <table className="w-full bg-white text-left">
              <thead>
                <tr className="border-b border-[#3C3C434A]">
                  <th className="px-4 py-3 font-medium">이름</th>
                  <th className="px-4 py-3 font-medium">연락처</th>
                  <th className="px-4 py-3 font-medium">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3C3C434A]">
                {creators.map((creator) => (
                  <tr key={creator.id}>
                    <td className="px-4 py-3">{creator.name}</td>
                    <td className="px-4 py-3">{creator.contact ?? "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link to={`/creators/${creator.id}/edit`} aria-label={`${creator.name} 수정`}>수정</Link>
                        <button type="button" aria-label={`${creator.name} 삭제`} onClick={() => void handleDelete(creator.id, creator.name)}>
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CreatorsLayout>
  )
}
