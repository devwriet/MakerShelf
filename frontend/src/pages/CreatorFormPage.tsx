import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { LiquidGlass } from "@/components/LiquidGlass"
import { CreatorsLayout } from "@/components/creators/CreatorsLayout"
import {
  CreatorApiError,
  createCreator,
  getCreator,
  updateCreator,
  type CreatorRequest,
} from "@/lib/api/creators"
import { Button } from "@/components/ui/button"

export function CreatorFormPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditMode = id !== undefined
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(isEditMode)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }

    const creatorId = id
    let isCurrent = true

    async function loadCreator() {
      setErrorMessage(null)
      setLoadError(null)
      setIsLoading(true)

      try {
        const creator = await getCreator(creatorId)
        if (isCurrent) {
          setName(creator.name)
          setContact(creator.contact ?? "")
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error instanceof CreatorApiError && error.status === 404
              ? "창작자를 찾을 수 없어요"
              : "오류가 발생했어요. 다시 시도해주세요.",
          )
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadCreator()

    return () => {
      isCurrent = false
    }
  }, [id])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFieldErrors({})
    setErrorMessage(null)
    setIsSubmitting(true)

    const data: CreatorRequest = {
      name: name.trim(),
      contact: contact.trim() || null,
    }

    try {
      if (id) {
        await updateCreator(id, data)
      } else {
        await createCreator(data)
      }
      navigate("/creators")
    } catch (error) {
      if (error instanceof CreatorApiError && error.fieldErrors) {
        setFieldErrors(error.fieldErrors)
      } else {
        setErrorMessage("오류가 발생했어요. 다시 시도해주세요.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const title = isEditMode ? "창작자 수정" : "새 창작자 등록"
  const subtitle = isEditMode ? "창작자 정보를 수정해주세요" : "창작자 정보를 입력해주세요"

  return (
    <CreatorsLayout>
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 py-12 text-center">
        {loadError ? (
          <>
            <p className="text-sm text-red-600">{loadError}</p>
            <Link to="/creators" className="mt-4 text-sm text-black/60 transition-colors hover:text-black">
              ← 창작자 목록
            </Link>
          </>
        ) : (
          <>
            <Link to="/creators" className="text-sm text-black/60 transition-colors hover:text-black">
              ← 창작자 목록
            </Link>

            <h1 className="mt-8 text-3xl font-semibold text-ink">{title}</h1>
            <p className="mt-2 text-sm text-black/60">{subtitle}</p>

            {isLoading ? (
              <p className="mt-10 text-sm text-black/60">불러오는 중...</p>
            ) : (
              <LiquidGlass
                radius="2rem"
                className="mt-10 w-full"
                contentClassName="p-8 sm:p-10"
              >
                <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
                  {errorMessage && (
                    <p role="alert" className="text-sm text-red-600">
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex w-full flex-col items-center gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-ink">
                      이름 *
                    </label>
                    <input
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="예: 김민준"
                      required
                      maxLength={100}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      className="h-12 w-full rounded-full border border-black/10 bg-white/70 px-5 text-center text-sm outline-none placeholder:text-black/40 focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20"
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="text-xs text-red-600">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex w-full flex-col items-center gap-2">
                    <label htmlFor="contact" className="text-sm font-medium text-ink">
                      연락처 (선택)
                    </label>
                    <input
                      id="contact"
                      value={contact}
                      onChange={(event) => setContact(event.target.value)}
                      placeholder="전화번호 또는 이메일"
                      aria-invalid={Boolean(fieldErrors.contact)}
                      aria-describedby={fieldErrors.contact ? "contact-error" : undefined}
                      className="h-12 w-full rounded-full border border-black/10 bg-white/70 px-5 text-center text-sm outline-none placeholder:text-black/40 focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20"
                    />
                    {fieldErrors.contact && (
                      <p id="contact-error" className="text-xs text-red-600">
                        {fieldErrors.contact}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex justify-center gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 rounded-full bg-[#0088FF] px-7 text-white hover:bg-[#0088FF]/90"
                    >
                      저장
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-full px-7">
                      <Link to="/creators">취소</Link>
                    </Button>
                  </div>
                </form>
              </LiquidGlass>
            )}
          </>
        )}
      </div>
    </CreatorsLayout>
  )
}
