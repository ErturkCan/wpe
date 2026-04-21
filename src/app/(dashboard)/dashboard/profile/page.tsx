import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ProfileForm } from "@/components/dashboard/ProfileForm"

export const dynamic = 'force-dynamic'

export const metadata = { title: "Profil" }

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) return null

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return null

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">Profil</h1>
      <p className="mt-1 text-sm text-text-secondary">Kişisel bilgilerinizi yönetin.</p>
      <div className="mt-8">
        <ProfileForm user={user} />
      </div>
    </div>
  )
}
