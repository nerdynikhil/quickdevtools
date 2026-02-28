import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CopyButton from '@/components/shared/CopyButton'
import bcrypt from 'bcryptjs'

export default function BcryptToolTool() {
  const [password, setPassword] = useState('')
  const [rounds, setRounds] = useState(10)
  const [hash, setHash] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [verifyHash, setVerifyHash] = useState('')
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const generateHash = async () => {
    if (!password) return
    setLoading(true)
    try {
      const result = await bcrypt.hash(password, rounds)
      setHash(result)
    } finally {
      setLoading(false)
    }
  }

  const verify = async () => {
    if (!verifyPassword || !verifyHash) return
    setLoading(true)
    try {
      const result = await bcrypt.compare(verifyPassword, verifyHash)
      setVerifyResult(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolPage title="Bcrypt Hash / Verify" description="Hash and verify passwords with bcrypt">
      <Tabs defaultValue="hash">
        <TabsList>
          <TabsTrigger value="hash">Hash</TabsTrigger>
          <TabsTrigger value="verify">Verify</TabsTrigger>
        </TabsList>
        <TabsContent value="hash" className="space-y-3 mt-3">
          <div>
            <Label className="mb-1 block">Password</Label>
            <Input
              placeholder="Enter password to hash..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-mono"
            />
          </div>
          <div>
            <Label className="mb-1 block">Rounds: {rounds}</Label>
            <Input type="number" min={4} max={14} value={rounds} onChange={(e) => setRounds(Number(e.target.value))} className="w-20" />
          </div>
          <div className="flex gap-2">
            <Button onClick={generateHash} disabled={loading || !password}>
              {loading ? 'Hashing...' : 'Hash'}
            </Button>
            <CopyButton text={hash} />
          </div>
          {hash && (
            <div className="rounded-lg border p-3">
              <code className="text-sm break-all">{hash}</code>
            </div>
          )}
        </TabsContent>
        <TabsContent value="verify" className="space-y-3 mt-3">
          <div>
            <Label className="mb-1 block">Password</Label>
            <Input
              placeholder="Enter password..."
              value={verifyPassword}
              onChange={(e) => { setVerifyPassword(e.target.value); setVerifyResult(null) }}
              className="font-mono"
            />
          </div>
          <div>
            <Label className="mb-1 block">Bcrypt Hash</Label>
            <Input
              placeholder="Enter bcrypt hash..."
              value={verifyHash}
              onChange={(e) => { setVerifyHash(e.target.value); setVerifyResult(null) }}
              className="font-mono"
            />
          </div>
          <Button onClick={verify} disabled={loading || !verifyPassword || !verifyHash}>
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
          {verifyResult !== null && (
            <div className={`rounded-lg border p-3 ${verifyResult ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
              <p className={`font-medium ${verifyResult ? 'text-green-500' : 'text-red-500'}`}>
                {verifyResult ? 'Match! Password is correct.' : 'No match. Password is incorrect.'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </ToolPage>
  )
}
